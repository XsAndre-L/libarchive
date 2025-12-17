### Clean All

```bash
rm -rf build
```

### x86_64

```bash
cmake -S . -B build/build-x86_64 -G Ninja \
  -DCMAKE_BUILD_TYPE=Release \
  -DBUILD_SHARED_LIBS=OFF \
  -DBUILD_TOOLS=OFF \
  -DBUILD_TESTING=OFF \
  -DZIPIOS_BUILD_TOOLS=OFF \
  -DZIPIOS_INSTALL_TOOLS=OFF \
  -DZIPIOS_WINDOWS=ON \
  -DCMAKE_C_COMPILER=D:/Toolchains/llvm-mingw/bin/clang.exe \
  -DCMAKE_CXX_COMPILER=D:/Toolchains/llvm-mingw/bin/clang++.exe \
  -DCMAKE_C_COMPILER_TARGET=x86_64-w64-windows-gnu \
  -DCMAKE_CXX_COMPILER_TARGET=x86_64-w64-windows-gnu \
  -DCMAKE_SYSTEM_NAME=Windows \
  -DCMAKE_CXX_STANDARD=20 \
  -DCMAKE_POLICY_DEFAULT_CMP0074=NEW \
  -DZLIB_USE_STATIC_LIBS=ON \
  -DZLIB_INCLUDE_DIR=D:/Dev/Libs/zlib/x86_64/include \
  -DZLIB_LIBRARY=D:/Dev/Libs/zlib/x86_64/lib/libzs.a \
  -DZLIB_ROOT=D:/Dev/Libs/zlib/x86_64 \
  -DCMAKE_PREFIX_PATH=D:/Dev/Libs/zlib/x86_64 \
  -DCMAKE_INSTALL_PREFIX=D:/Dev/Libs/zipios/x86_64

cmake --build build/build-x86_64 -j --target zipios
cmake --install build/build-x86_64


cmake -S . -B build/build-x86_64 -G Ninja \
  -DCMAKE_BUILD_TYPE=Release \
  -DBUILD_SHARED_LIBS=OFF \
  -DBUILD_TOOLS=OFF \
  -DBUILD_TESTING=OFF \
  -DZIPIOS_BUILD_TOOLS=OFF \
  -DZIPIOS_INSTALL_TOOLS=OFF \
  -DCMAKE_C_COMPILER=D:/Toolchains/llvm-mingw/bin/clang.exe \
  -DCMAKE_CXX_COMPILER=D:/Toolchains/llvm-mingw/bin/clang++.exe \
  -DCMAKE_C_COMPILER_TARGET=x86_64-w64-windows-gnu \
  -DCMAKE_CXX_COMPILER_TARGET=x86_64-w64-windows-gnu \
  -DCMAKE_SYSTEM_NAME=Windows \
  -DZIPIOS_WINDOWS=ON \
  -DCMAKE_CXX_STANDARD=20 \
  -DCMAKE_POLICY_DEFAULT_CMP0074=NEW \
  -DZLIB_USE_STATIC_LIBS=ON \
  -DCMAKE_PREFIX_PATH=../../packages/out/zlib/x86_64 \
  -DZLIB_ROOT=../../packages/out/zlib/x86_64 \
  -DZLIB_INCLUDE_DIR=../../packages/out/zlib/x86_64/include \
  -DZLIB_LIBRARY=../../packages/out/zlib/x86_64/lib/libz.a \
  -DCMAKE_INSTALL_PREFIX=../../packages/out
```

### aarch64

```bash
cmake -S . -B build/build-aarch64 -G Ninja \
  -DCMAKE_BUILD_TYPE=Release \
  -DBUILD_SHARED_LIBS=OFF \
  -DBUILD_TOOLS=OFF \
  -DBUILD_TESTING=OFF \
  -DZIPIOS_BUILD_TOOLS=OFF \
  -DZIPIOS_INSTALL_TOOLS=OFF \
  -DCMAKE_C_COMPILER=D:/Toolchains/llvm-mingw/bin/clang.exe \
  -DCMAKE_CXX_COMPILER=D:/Toolchains/llvm-mingw/bin/clang++.exe \
  -DCMAKE_C_COMPILER_TARGET=aarch64-w64-windows-gnu \
  -DCMAKE_CXX_COMPILER_TARGET=aarch64-w64-windows-gnu \
  -DCMAKE_SYSTEM_NAME=Windows \
  -DCMAKE_CXX_STANDARD=20 \
  -DCMAKE_POLICY_DEFAULT_CMP0074=NEW \
  -DZLIB_USE_STATIC_LIBS=ON \
  -DZIPIOS_WINDOWS=ON \
  -DZLIB_INCLUDE_DIR=D:/Dev/Libs/zlib/aarch64/include \
  -DZLIB_LIBRARY=D:/Dev/Libs/zlib/aarch64/lib/libzs.a \
  -DZLIB_ROOT=D:/Dev/Libs/zlib/aarch64 \
  -DCMAKE_PREFIX_PATH=D:/Dev/Libs/zlib/aarch64 \
  -DCMAKE_INSTALL_PREFIX=D:/Dev/Libs/zipios/aarch64

cmake --build build/build-aarch64 -j --target zipios
cmake --install build/build-aarch64
```
