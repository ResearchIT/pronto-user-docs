# Pre-installed Software

The listed versions are for the `ml-gpu/{{ recommended_mlgpu_version() }}` version of the container. [Older versions](#older-container-software-versions) of the container are available but may not contain all of the listed packages.

## CUDA Version

11.8

## Primary Utilities

* Python: 3.10.11
* R: 4.2.3
* PyTorch: 2.0.0+cu118
* Tensorflow: 2.12.0
* Keras: 2.12.0

## Python Packages

```
absl-py==1.4.0
aiofiles==22.1.0
aiosqlite==0.19.0
anyio==3.6.2
appdirs==1.4.4
argon2-cffi==21.3.0
argon2-cffi-bindings==21.2.0
arrow==1.2.3
asttokens==2.2.1
astunparse==1.6.3
attrs==23.1.0
audioread==3.0.0
Babel==2.12.1
backcall==0.2.0
beautifulsoup4==4.12.2
bleach==6.0.0
cachetools==5.3.0
certifi==2022.12.7
cffi==1.15.1
charset-normalizer==3.1.0
cmake==3.25.0
comm==0.1.3
contourpy==1.0.7
cupy-cuda11x==12.0.0
cycler==0.11.0
debugpy==1.6.7
decorator==5.1.1
defusedxml==0.7.1
dgl==1.1
enum34==1.1.10
executing==1.2.0
fastjsonschema==2.16.3
fastrlock==0.8.1
filelock==3.9.0
flatbuffers==23.3.3
fonttools==4.39.3
fqdn==1.5.1
gast==0.4.0
google-auth==2.17.3
google-auth-oauthlib==1.0.0
google-pasta==0.2.0
graphviz==0.8.4
grpcio==1.54.0
h5py==3.8.0
idna==3.4
ipykernel==6.22.0
ipython==8.12.0
ipython-genutils==0.2.0
ipywidgets==8.0.6
isoduration==20.11.0
jax==0.4.8
jaxlib==0.4.7+cuda11.cudnn86
jedi==0.18.2
Jinja2==3.1.2
joblib==1.2.0
json5==0.9.11
jsonpointer==2.3
jsonschema==4.17.3
jupyter==1.0.0
jupyter-console==6.6.3
jupyter-events==0.6.3
jupyter-ydoc==0.2.4
jupyter_client==8.2.0
jupyter_core==5.3.0
jupyter_server==2.5.0
jupyter_server_fileid==0.9.0
jupyter_server_terminals==0.4.4
jupyter_server_ydoc==0.8.0
jupyterlab==3.6.3
jupyterlab-pygments==0.2.2
jupyterlab-widgets==3.0.7
jupyterlab_server==2.22.1
keras==2.12.0
Keras-Preprocessing==1.1.2
kiwisolver==1.4.4
lazy_loader==0.2
libclang==16.0.0
librosa==0.10.0.post2
lit==15.0.7
littleutils==0.2.2
llvmlite==0.39.1
Markdown==3.4.3
MarkupSafe==2.1.2
matplotlib==3.7.1
matplotlib-inline==0.1.6
mistune==2.0.5
ml-dtypes==0.1.0
mlxtend==0.22.0
mpmath==1.2.1
msgpack==1.0.5
mxnet-cu117==1.9.1
nbclassic==0.5.6
nbclient==0.7.4
nbconvert==7.3.1
nbformat==5.8.0
nest-asyncio==1.5.6
networkx==3.0
notebook==6.5.4
notebook_shim==0.2.3
numba==0.56.4
numpy==1.23.5
oauthlib==3.2.2
ogb==1.3.6
opencv-python==4.7.0.72
opt-einsum==3.3.0
outdated==0.2.2
packaging==23.1
pandas==2.0.1
pandas-ml==0.6.1
pandocfilters==1.5.0
parso==0.8.3
pexpect==4.8.0
pickleshare==0.7.5
Pillow==9.3.0
platformdirs==3.5.0
pooch==1.6.0
prometheus-client==0.16.0
prompt-toolkit==3.0.38
protobuf==4.22.3
psutil==5.9.5
ptyprocess==0.7.0
pure-eval==0.2.2
pyasn1==0.5.0
pyasn1-modules==0.3.0
pycparser==2.21
Pygments==2.15.1
pyparsing==3.0.9
pyrsistent==0.19.3
python-dateutil==2.8.2
python-json-logger==2.0.7
pytz==2023.3
PyYAML==6.0
pyzmq==25.0.2
qtconsole==5.4.2
QtPy==2.3.1
requests==2.29.0
requests-oauthlib==1.3.1
rfc3339-validator==0.1.4
rfc3986-validator==0.1.1
rsa==4.9
scikit-learn==1.2.2
scipy==1.10.1
Send2Trash==1.8.2
six==1.16.0
sniffio==1.3.0
soundfile==0.12.1
soupsieve==2.4.1
soxr==0.3.5
stack-data==0.6.2
sympy==1.11.1
tensorboard==2.12.2
tensorboard-data-server==0.7.0
tensorboard-plugin-wit==1.8.1
tensorflow @ file:///build/tensorflow/output/tf/tensorflow-2.12.0-cp310-cp310-linux_x86_64.whl
tensorflow-estimator==2.12.0
tensorflow-io-gcs-filesystem==0.32.0
tensorrt @ file:///build/TensorRT-8.5.3.1/python/tensorrt-8.5.3.1-cp310-none-linux_x86_64.whl
termcolor==2.3.0
terminado==0.17.1
threadpoolctl==3.1.0
tinycss2==1.2.1
tomli==2.0.1
torch==2.0.0+cu118
torch-cluster @ git+https://github.com/rusty1s/pytorch_cluster@84bbb7140e03df01b3bb388ba4df299328ea2dff
torch-scatter @ git+https://github.com/rusty1s/pytorch_scatter@dbf42c4017446c18b46b810078aaabb6355cf675
torch-sparse @ git+https://github.com/rusty1s/pytorch_sparse@2a7337145fcb63219d7570a62f531de4c1a9458a
torch-spline-conv @ git+https://github.com/rusty1s/pytorch_spline_conv@70247f1f770469f3b14486a5477e486370e9f844
torch_geometric @ git+https://github.com/pyg-team/pytorch_geometric@e919aa1930bf262a120544ddc1685ecec29f2a64
torchaudio==2.0.1+cu118
torchvision==0.15.1+cu118
tornado==6.3.1
tqdm==4.65.0
traitlets==5.9.0
triton==2.0.0
typing_extensions==4.5.0
tzdata==2023.3
uff @ file:///build/TensorRT-8.5.3.1/uff/uff-0.6.9-py2.py3-none-any.whl
uri-template==1.2.0
urllib3==1.26.15
wcwidth==0.2.6
webcolors==1.13
webencodings==0.5.1
websocket-client==1.5.1
Werkzeug==2.3.1
widgetsnbextension==4.0.7
wrapt==1.14.1
y-py==0.5.9
ypy-websocket==0.8.2
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
                   ml-gpu/20230427
                </th>
                <td>11.8</td>
                <td>3.10.11</td>
                <td>4.2.3</td>
                <td>2.0.0+cu118</td>
                <td>2.12.0</td>
                <td>2.12.0</td>
            </tr>
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