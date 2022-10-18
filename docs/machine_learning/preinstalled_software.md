# Pre-installed Software

The listed versions are for the `ml-gpu/{{ recommended_mlgpu_version() }}` version of the container. [Older versions](#older-container-software-versions) of the container are available but may not contain all of the listed packages.

## CUDA Version

11.7

## Primary Utilities

* Python: 3.10.7
* R: 4.2.1
* PyTorch: 1.13.0.dev20220923+cu117
* Tensorflow: 2.11.0
* Keras: 2.10.0

## Python Packages

```
absl-py==1.2.0
anyio==3.6.1
appdirs==1.4.4
argon2-cffi==21.3.0
argon2-cffi-bindings==21.2.0
asttokens==2.0.8
astunparse==1.6.3
attrs==22.1.0
audioread==3.0.0
Babel==2.10.3
backcall==0.2.0
beautifulsoup4==4.11.1
bleach==5.0.1
cachetools==5.2.0
certifi==2022.9.24
cffi==1.15.1
charset-normalizer==2.1.1
contourpy==1.0.5
cupy-cuda117==10.6.0
cycler==0.11.0
debugpy==1.6.3
decorator==5.1.1
defusedxml==0.7.1
dgl==0.9
entrypoints==0.4
enum34==1.1.10
etils==0.8.0
executing==1.1.0
fastjsonschema==2.16.2
fastrlock==0.8
flatbuffers==22.9.24
fonttools==4.37.3
gast==0.4.0
google-auth==2.12.0
google-auth-oauthlib==0.4.6
google-pasta==0.2.0
graphviz==0.8.4
grpcio==1.49.1
h5py==3.7.0
idna==3.4
importlib-resources==5.9.0
ipykernel==6.16.0
ipython==8.5.0
ipython-genutils==0.2.0
ipywidgets==8.0.2
jax==0.3.19
jaxlib==0.3.15+cuda11.cudnn82
jedi==0.18.1
Jinja2==3.1.2
joblib==1.2.0
json5==0.9.10
jsonschema==4.16.0
jupyter==1.0.0
jupyter-console==6.4.4
jupyter-core==4.11.1
jupyter-server==1.19.1
jupyter_client==7.3.5
jupyterlab==3.4.7
jupyterlab-pygments==0.2.2
jupyterlab-widgets==3.0.3
jupyterlab_server==2.15.2
keras==2.10.0
Keras-Preprocessing==1.1.2
kiwisolver==1.4.4
libclang==14.0.6
librosa==0.9.2
littleutils==0.2.2
llvmlite==0.39.1
lxml==4.9.1
Markdown==3.4.1
MarkupSafe==2.1.1
matplotlib==3.6.0
matplotlib-inline==0.1.6
mistune==2.0.4
mlxtend==0.21.0
mxnet==1.9.1
nbclassic==0.4.3
nbclient==0.6.8
nbconvert==7.0.0
nbformat==5.6.1
nest-asyncio==1.5.5
networkx==2.8.6
notebook==6.4.12
notebook-shim==0.1.0
numba==0.56.2
numpy==1.23.3
oauthlib==3.2.1
ogb==1.3.4
opencv-python==4.6.0.66
opt-einsum==3.3.0
outdated==0.2.1
packaging==21.3
pandas==1.5.0
pandas-ml==0.6.1
pandocfilters==1.5.0
parso==0.8.3
pexpect==4.8.0
pickleshare==0.7.5
Pillow==9.2.0
pooch==1.6.0
prometheus-client==0.14.1
prompt-toolkit==3.0.31
protobuf==3.19.5
psutil==5.9.2
ptyprocess==0.7.0
pure-eval==0.2.2
pyasn1==0.4.8
pyasn1-modules==0.2.8
pycparser==2.21
Pygments==2.13.0
pyparsing==3.0.9
pyrsistent==0.18.1
python-dateutil==2.8.2
pytz==2022.2.1
pyzmq==24.0.1
qtconsole==5.3.2
QtPy==2.2.0
requests==2.28.1
requests-oauthlib==1.3.1
resampy==0.4.2
rsa==4.9
scikit-learn==1.1.2
scipy==1.9.1
Send2Trash==1.8.0
six==1.16.0
sniffio==1.3.0
soundfile==0.11.0
soupsieve==2.3.2.post1
stack-data==0.5.1
tensorboard==2.10.1
tensorboard-data-server==0.6.1
tensorboard-plugin-wit==1.8.1
tensorflow @ file:///build/tensorflow/output/tf/tensorflow-2.11.0-cp310-cp310-linux_x86_64.whl
tensorflow-estimator==2.10.0
tensorflow-io-gcs-filesystem==0.27.0
tensorrt @ file:///build/TensorRT-8.4.2.4/python/tensorrt-8.4.2.4-cp310-none-linux_x86_64.whl
termcolor==2.0.1
terminado==0.15.0
threadpoolctl==3.1.0
tinycss2==1.1.1
tomli==2.0.1
torch==1.13.0.dev20220923+cu117
torch-cluster @ git+https://github.com/rusty1s/pytorch_cluster@273873888f930cd92a13badb00841d0ed85e9258
torch-geometric @ git+https://github.com/pyg-team/pytorch_geometric@d5e65e6f25e3e2cd4951f6aa4cb6cea37c0155f7
torch-scatter @ git+https://github.com/rusty1s/pytorch_scatter@18d3759089791fc9659d26a05af1f43e61f93765
torch-sparse @ git+https://github.com/rusty1s/pytorch_sparse@e692eff8a456c38c2089e12ac1bd264d40b47092
torch-spline-conv @ git+https://github.com/rusty1s/pytorch_spline_conv@18f48b73cb15ebaf33c5ad625ccbad54f561c7ae
torchaudio==0.13.0.dev20220923+cu117
torchvision==0.14.0.dev20220923+cu117
tornado==6.2
tqdm==4.64.1
traitlets==5.4.0
typing_extensions==4.3.0
urllib3==1.26.12
wcwidth==0.2.5
webencodings==0.5.1
websocket-client==1.4.1
Werkzeug==2.2.2
widgetsnbextension==4.0.3
wrapt==1.14.1
zipp==3.8.1
```

## Older Container Software Versions
The column on the left is the name of the module to load to get these versions of the software.

<div class="wy-table-responsive">
    <table class="docutils">
        <thead>
            <tr>
                <td></td>
                <th>CUDA</th>
                <th>Python</th>
                <th>R</th>
                <th>PyTorch</th>
                <th>TensorFlow</th>
                <th>Keras</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th scope="row">
                   ml-gpu/20220928
                </th>
                <td>11.7</td>
                <td>3.10.7</td>
                <td>4.2.1</td>
                <td>1.13.0.dev20220923</td>
                <td>2.11.0</td>
                <td>2.10.0</td>
            </tr>
            <tr>
                <th scope="row">
                   ml-gpu/20220603
                </th>
                <td>11.6</td>
                <td>3.9.13</td>
                <td>4.1.3</td>
                <td>1.11.0a0+gitbc2c6ed</td>
                <td>2.9.1</td>
                <td>2.9.0</td>
            </tr>
            <tr>
                <th scope="row">
                   ml-gpu/20210901
                </th>
                <td>11.0</td>
                <td>3.8.11</td>
                <td>4.1.0</td>
                <td>1.9.0a0+gitd69c22d</td>
                <td>2.5.0</td>
                <td>(broken)</td>
            </tr>
            <tr>
                <th scope="row">
                   ml-gpu/20210730
                </th>
                <td>11.0</td>
                <td>3.6.8</td>
                <td>4.0.5</td>
                <td>1.10.0a0+gitdc1bd6a</td>
                <td>2.5.0</td>
                <td>(broken)</td>
            </tr>
            <tr>
                <th scope="row">
                   ml-gpu/20210616
                </th>
                <td>11.1</td>
                <td>3.6.8</td>
                <td>4.0.5</td>
                <td>1.9.0+cu111</td>
                <td>2.5.0</td>
                <td>(broken)</td>
            </tr>
            <tr>
                <th scope="row">
                   ml-gpu/20210428
                </th>
                <td>11.1</td>
                <td>3.6.8</td>
                <td>4.0.4</td>
                <td>1.8.0+cu111</td>
                <td>2.4.1</td>
                <td>2.4.3</td>
            </tr>
            <tr>
                <th scope="row">
                   ml-gpu/20210319
                </th>
                <td>11.1</td>
                <td>3.6.8</td>
                <td>4.0.4</td>
                <td>1.8.0+cu111</td>
                <td>2.4.1</td>
                <td>2.4.3</td>
            </tr>
            <tr>
                <th scope="row">
                   ml-gpu/20210222
                </th>
                <td>11.1</td>
                <td>3.6.8</td>
                <td>4.0.3</td>
                <td>1.7.1</td>
                <td>2.4.1</td>
                <td>2.4.3</td>
            </tr>
            <tr>
                <th scope="row">
                   ml-gpu/20210202
                </th>
                <td>11.1</td>
                <td>3.6.8</td>
                <td>4.0.3</td>
                <td>1.7.1</td>
                <td>2.4.1</td>
                <td>2.4.3</td>
            </tr>
            <tr>
                <th scope="row">
                   ml-gpu/20200915
                </th>
                <td>10.1</td>
                <td>3.6.8</td>
                <td>4.0.2</td>
                <td>1.6.0</td>
                <td>2.3.0</td>
                <td>2.4.3</td>
            </tr>
            <tr>
                <th scope="row">
                   ml-gpu/20200902
                </th>
                <td>11.0</td>
                <td>3.6.8</td>
                <td>4.0.2</td>
                <td>1.6.0</td>
                <td>2.3.0</td>
                <td>2.4.3</td>
            </tr>
            <tr>
                <th scope="row">
                   ml-gpu/20200210
                </th>
                <td>10.0</td>
                <td>2.7.5<br/>3.6.8</td>
                <td>3.6.0</td>
                <td>1.4.0</td>
                <td>2.1.0</td>
                <td>2.3.1</td>
            </tr>
            <tr>
                <th scope="row">
                   ml-gpu/20190715
                </th>
                <td>10.1</td>
                <td>2.7.5<br/>3.6.8</td>
                <td>3.6.0</td>
                <td>1.1.0</td>
                <td>1.14.0</td>
                <td>2.2.4</td>
            </tr>
            <tr>
                <th scope="row">
                   ml-gpu/20190305
                </th>
                <td>10.1</td>
                <td>2.7.5</td>
                <td>3.5.2</td>
                <td>1.0.1.post2</td>
                <td>1.13.1</td>
                <td>2.2.4</td>
            </tr>
        </tbody>
    </table>
</div>

## Older Container Compatibility

Please note that in older versions of the container you may need to adjust the commands from those given in the previous guides.

The virtual environment functionality might not work. You can achieve similar results by running the following before loading the ml-gpu module:

```
export PYTHONUSERBASE=/work/LAS/your-lab/mlgpupackages-{{ recommended_mlgpu_version() }}
```

You should store packages in a different directory for each version of the ml-gpu container that you use in order to to avoid possible version conflicts.

Then, instead of `ml-gpu /work/LAS/your-lab/mlgpuvenv/bin/pip3`, try one of:

* `ml-gpu python -m pip`
* `ml-gpu pip2`
* `ml-gpu pip3`


And, instead of `ml-gpu /work/LAS/your-lab/mlgpuvenv/bin/python`, try one of:

* `ml-gpu python`
* `ml-gpu python2`
* `ml-gpu python3`