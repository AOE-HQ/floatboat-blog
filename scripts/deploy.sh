#!/usr/bin/env bash
set -euo pipefail

: "${IMAGE_URI:?IMAGE_URI is required}"
: "${K8S_NAMESPACE:?K8S_NAMESPACE is required}"
: "${K8S_DEPLOYMENT:?K8S_DEPLOYMENT is required}"
: "${K8S_CONTAINER:?K8S_CONTAINER is required}"
: "${PREVIEW_URL:?PREVIEW_URL is required}"

case "${IMAGE_URI}" in
  *@sha256:*) ;;
  *) echo "Immutable image digest is required." >&2; exit 1 ;;
esac

previous_image="$(kubectl -n "${K8S_NAMESPACE}" get deployment "${K8S_DEPLOYMENT}" \
  -o "jsonpath={.spec.template.spec.containers[?(@.name=='${K8S_CONTAINER}')].image}" 2>/dev/null || true)"

rollback_image() {
  if [[ -n "${previous_image}" ]]; then
    kubectl -n "${K8S_NAMESPACE}" set image "deployment/${K8S_DEPLOYMENT}" \
      "${K8S_CONTAINER}=${previous_image}"
    kubectl -n "${K8S_NAMESPACE}" rollout status "deployment/${K8S_DEPLOYMENT}" --timeout=10m
  fi
}

kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/ingress.yaml

kubectl set image -f k8s/deployment.yaml "${K8S_CONTAINER}=${IMAGE_URI}" --local -o yaml \
  | kubectl apply -f -

if ! kubectl -n "${K8S_NAMESPACE}" rollout status "deployment/${K8S_DEPLOYMENT}" --timeout=10m; then
  rollback_image
  exit 1
fi

feature_paths=(
  "/floatim"
  "/coworker"
  "/ai-scheduling-assistant"
  "/ai-file-organizer"
  "/zh/floatim"
  "/zh/coworker"
  "/zh/ai-scheduling-assistant"
  "/zh/ai-file-organizer"
)

for path in "${feature_paths[@]}"; do
  if ! curl --fail --silent --show-error --location \
    --retry 10 --retry-delay 3 --retry-all-errors \
    --output /dev/null "${PREVIEW_URL}${path}"; then
    echo "Preview probe failed for ${path}; main-site traffic was not changed." >&2
    rollback_image
    exit 1
  fi
done

# Cut the main-site routes over only after the new image serves every feature page.
kubectl apply -f k8s/ingress-main.yaml
