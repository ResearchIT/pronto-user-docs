# Pre-installed Software

The listed versions are for the `ml-gpu/20220603` version of the container. [Older versions](#older-container-software-versions) of the container are available but may not contain all of the listed packages.

## Primary Utilities

* Python: 3.9.13
* R: 4.1.3
* PyTorch: 1.11.0a0+gitbc2c6ed
* Tensorflow: 2.9.1
* Keras: 2.9.0

## Python Packages

```
absl-py==1.1.0
anyio==3.6.1
appdirs==1.4.4
argon2-cffi==21.3.0
argon2-cffi-bindings==21.2.0
asttokens==2.0.5
astunparse==1.6.3
attrs==21.4.0
audioread==2.1.9
Babel==2.10.1
backcall==0.2.0
beautifulsoup4==4.11.1
bleach==5.0.0
cachetools==5.2.0
certifi==2022.5.18.1
cffi==1.15.0
charset-normalizer==2.0.12
cupy-cuda110==10.5.0
cycler==0.11.0
dataclasses==0.6
debugpy==1.6.0
decorator==5.1.1
defusedxml==0.7.1
dgl==0.9
entrypoints==0.4
enum34==1.1.10
executing==0.8.3
fastjsonschema==2.15.3
fastrlock==0.8
flatbuffers==1.12
fonttools==4.33.3
future==0.18.2
gast==0.4.0
google-auth==2.6.6
google-auth-oauthlib==0.4.6
google-pasta==0.2.0
graphviz==0.8.4
grpcio==1.46.3
h5py==3.7.0
idna==3.3
importlib-metadata==4.11.4
ipykernel==6.13.0
ipython==8.4.0
ipython-genutils==0.2.0
ipywidgets==7.7.0
jedi==0.18.1
Jinja2==3.1.2
joblib==1.1.0
json5==0.9.8
jsonschema==4.6.0
jupyter==1.0.0
jupyter-client==7.3.1
jupyter-console==6.4.3
jupyter-core==4.10.0
jupyter-server==1.17.0
jupyterlab==3.4.2
jupyterlab-pygments==0.2.2
jupyterlab-server==2.14.0
jupyterlab-widgets==1.1.0
keras==2.9.0
Keras-Preprocessing==1.1.2
kiwisolver==1.4.2
libclang==14.0.1
librosa==0.9.1
littleutils==0.2.2
llvmlite==0.38.1
Markdown==3.3.7
MarkupSafe==2.1.1
matplotlib==3.5.2
matplotlib-inline==0.1.3
mistune==0.8.4
mlxtend==0.20.0
mxnet==1.9.1
nbclassic==0.3.7
nbclient==0.6.4
nbconvert==6.5.0
nbformat==5.4.0
nest-asyncio==1.5.5
networkx==2.8.2
notebook==6.4.11
notebook-shim==0.1.0
numba==0.55.2
numpy==1.22.4
oauthlib==3.2.0
ogb==1.3.3
opencv-python==4.5.5.64
opt-einsum==3.3.0
outdated==0.2.1
packaging==21.3
pandas==1.4.2
pandas-ml==0.6.1
pandocfilters==1.5.0
parso==0.8.3
pexpect==4.8.0
pickleshare==0.7.5
Pillow==9.1.1
Pillow-SIMD==9.0.0.post1
pooch==1.6.0
prometheus-client==0.14.1
prompt-toolkit==3.0.29
protobuf==3.19.4
psutil==5.9.1
ptyprocess==0.7.0
pure-eval==0.2.2
pyasn1==0.4.8
pyasn1-modules==0.2.8
pycparser==2.21
Pygments==2.12.0
pyparsing==3.0.9
pyrsistent==0.18.1
python-dateutil==2.8.2
pytz==2022.1
PyYAML==6.0
pyzmq==23.1.0
qtconsole==5.3.0
QtPy==2.1.0
requests==2.27.1
requests-oauthlib==1.3.1
resampy==0.2.2
rsa==4.8
scikit-learn==1.1.1
scipy==1.8.1
Send2Trash==1.8.0
six==1.16.0
sniffio==1.2.0
SoundFile==0.10.3.post1
soupsieve==2.3.2.post1
stack-data==0.2.0
tensorboard==2.9.0
tensorboard-data-server==0.6.1
tensorboard-plugin-wit==1.8.1
tensorflow @ file:///build/tensorflow/output/tf/tensorflow-2.9.1-cp39-cp39-linux_x86_64.whl
tensorflow-estimator==2.9.0
tensorflow-io-gcs-filesystem==0.26.0
tensorrt @ file:///build/TensorRT-8.2.5.1/python/tensorrt-8.2.5.1-cp39-none-linux_x86_64.whl
termcolor==1.1.0
terminado==0.15.0
threadpoolctl==3.1.0
tinycss2==1.1.1
torch @ file:///build/pytorch
torch-cluster @ git+https://github.com/rusty1s/pytorch_cluster@27090b071ccdd1c17a490e8908a1d2e8fc3f36bc
torch-geometric @ git+https://github.com/pyg-team/pytorch_geometric@97d55577f1d0bf33c1bfbe0ef864923ad5cb844d
torch-scatter @ git+https://github.com/rusty1s/pytorch_scatter@62a958f467bf80c3f566083b4949ec21e2be57d0
torch-sparse @ git+https://github.com/rusty1s/pytorch_sparse@09a90659d0fffec423a32f8f74d178f08d703558
torch-spline-conv @ git+https://github.com/rusty1s/pytorch_spline_conv@07e3eae0f4004e3fffc6684d8cd76a9204dc960b
torchaudio==0.11.0a0+0cd2509
torchvision==0.12.0a0+9b5a3fe
tornado==6.1
tqdm==4.64.0
traitlets==5.2.2.post1
typing_extensions==4.2.0
urllib3==1.26.9
wcwidth==0.2.5
webencodings==0.5.1
websocket-client==1.3.2
Werkzeug==2.1.2
widgetsnbextension==3.6.0
wrapt==1.14.1
zipp==3.8.0
```

## Older Container Software Versions
The column on the left is the name of the module to load to get these versions of the software.

<div class="wy-table-responsive">
    <table class="docutils">
        <thead>
            <tr>
                <td></td>
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
                   ml-gpu/20220603
                </th>
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
                <td>2.7.5, 3.6.8</td>
                <td>3.6.0</td>
                <td>1.4.0</td>
                <td>2.1.0</td>
                <td>2.3.1</td>
            </tr>
            <tr>
                <th scope="row">
                   ml-gpu/20190715
                </th>
                <td>2.7.5, 3.6.8</td>
                <td>3.6.0</td>
                <td>1.1.0</td>
                <td>1.14.0</td>
                <td>2.2.4</td>
            </tr>
            <tr>
                <th scope="row">
                   ml-gpu/20190305
                </th>
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
export PYTHONUSERBASE=/work/LAS/your-lab/mlgpupackages-20220603
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