#!/usr/bin/env bash
set -euo pipefail

: "${IMAGE_URI:?IMAGE_URI is required}"
: "${K8S_NAMESPACE:?K8S_NAMESPACE is required}"
: "${K8S_DEPLOYMENT:?K8S_DEPLOYMENT is required}"
: "${K8S_CONTAINER:?K8S_CONTAINER is required}"

case "${IMAGE_URI}" in
  *@sha256:*) ;;
  *) echo "Immutable image digest is required." >&2; exit 1 ;;
esac

previous_image="$(kubectl -n "${K8S_NAMESPACE}" get deployment "${K8S_DEPLOYMENT}" \
  -o "jsonpath={.spec.template.spec.containers[?(@.name=='${K8S_CONTAINER}')].image}" 2>/dev/null || true)"

kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/ingress.yaml

kubectl set image -f k8s/deployment.yaml "${K8S_CONTAINER}=${IMAGE_URI}" --local -o yaml \
  | kubectl apply -f -

if kubectl -n "${K8S_NAMESPACE}" rollout status "deployment/${K8S_DEPLOYMENT}" --timeout=10m; then
  exit 0
fi

if [[ -n "${previous_image}" ]]; then
  kubectl -n "${K8S_NAMESPACE}" set image "deployment/${K8S_DEPLOYMENT}" \
    "${K8S_CONTAINER}=${previous_image}"
  kubectl -n "${K8S_NAMESPACE}" rollout status "deployment/${K8S_DEPLOYMENT}" --timeout=10m
fi
exit 1
