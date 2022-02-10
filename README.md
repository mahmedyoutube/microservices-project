## docker-kubernetes Branch

1. kubernetes implemented

### Necessary Commands
1. Please checked the kuberenete option which is present on kubernetes desktop app

2. Please build and push each service docker file

3. replace docker image name which is present inside infra/k8s with your docker image name
4. optional ( you can skip step 2 & 3 if you want. Then you will work with my default image which is already present in the code )

5.  ``` kubectl apply -f infra/k8s ```

6. ingress-nginx docs ( https://kubernetes.github.io/ingress-nginx/deploy/#quick-start ) 

7. command to install ingress-nginx ``` kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.1/deploy/static/provider/cloud/deploy.yaml```
8. done



