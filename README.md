# K8s Deploy Action

This action performs generation of Kubernetes (K8s) resources from 
[Kustomize] sources and apply the configuration to a K8s cluster.

*Hint:* The _kubctl_ must be configured in a previous step.

## Inputs

### `resource-directory`

**Required** Location of the Kubernetes deployment resources.

### `kube-config-data`

Content of .kube/config file for K8s authentication. Default: system default.

### `images`

Images to deploy, e.g. `foo/example-app:latest` (see [other formats](https://github.com/kubernetes-sigs/kustomize/blob/master/examples/image.md)).

### `secrets-name`

Name of the Secret resource. Default: `secrets`.

### `secrets-from-files`

Secrets from files to set (e.g. for multi-line secrets)

### `secrets`

Literal secrets to set.


### `configmap-name`

Name of the configmap. Default: `configmap`.

### `configmap`

Literals of configmap to set.

### `configmap-from-files`

Configmap from files or folder to set (e.g. for using in volumes)

### `dry-run`

[Strategy](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#apply) passed to `kubectl apply`. Must be `none`, `server`, or `client`. Default: `none`. 

### `show-differences`

Prints the differences between the current "live" object using `kubcetl diff`

### `kubectl-params`

Additional parameters to pass to `kubectl apply`.

## Outputs

None.

## Example usage

```yaml
- name: Prepare secret files
  working-directory: ./deployment
  run: echo "$FOO_PRIVATE_KEY" > ./fooPrivateKey.secret

- name: Configure and deploy
  uses: 'sendinblue/k8s-deploy-action@v1'
  with:
    resource-directory: ./deployment
    image: foo/example-app:1.0.0
    secrets-name: 'example-app-secrets'
    secrets-from-files: |-
      fooPrivateKey=fooPrivateKey.secret
    secrets: |
      fooToken=abc123
    configmap-name: 'configs'
    configmap: |-
      labels=production
      auto-scaling=true
    configmap-from-files: |
      fooConfig=foo.config
```

[Kustomize]: https://kubernetes.io/docs/tasks/manage-kubernetes-objects/kustomization/
