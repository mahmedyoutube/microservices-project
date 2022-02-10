## docker-kubernetes Branch

1. kubernetes implemented

### Necessary Commands
1. Please checked the kuberenete option which is present on docker desktop app ( docker app -> settings -> kubernetes option )

2. Please build and pushed your docker image on hub.docker.com

3. replace docker image name which is present inside infra/k8s with your docker image name
4. optional ( you can skip steps 2 & 3 if you want. Then you will work with my default image which is already present in the code )

5. Run a command  ``` kubectl apply -f infra/k8s ```

6. ingress-nginx docs ( https://kubernetes.github.io/ingress-nginx/deploy/#quick-start ) 

7. command to install ingress-nginx ``` kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.1/deploy/static/provider/cloud/deploy.yaml```
8. command to add secrets in an env ``` kubectl create secret generic secretName --from-literal key=value ```

9. print secrets value ``` kubectl get secret secretName -o jsonpath='{.data}' ```
10. secret key value will be in the form of base64, you need to decode this value in order to see original value


