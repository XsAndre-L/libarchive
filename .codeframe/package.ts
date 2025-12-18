import {
	BuildType,
	CPP_OUTPUT_DIR,
	runPackageAction,
	CMAKE_TOOLS,
	getHostSysrootPath,
	SYSROOT,
	PACKAGE_DIR,
} from "../../../../src/providers/package.privider.ts";

import { resolve, join } from "node:path";
import { argv } from "node:process";

export const build = (cwd: string = process.cwd()): BuildType => {
	const { windows_x86_64, windows_aarch64, linux_x86_64, linux_aarch64 } =
		SYSROOT;

	const HOST_SYSROOT = getHostSysrootPath();
	const CLANG = join(HOST_SYSROOT, "bin/clang.exe").replace(/\\/g, "/");
	const CLANGXX = join(HOST_SYSROOT, "bin/clang++.exe").replace(/\\/g, "/");
	const PACKAGES = resolve(PACKAGE_DIR, "cpp-packages");
	const ZSTD_LIB = resolve(PACKAGES, "zstd");

	// Common flags to keep the build minimal and focused on the library
	const LIBARCHIVE_COMMON_FLAGS = `\
      -DENABLE_TEST=OFF \
      -DENABLE_COVERAGE=OFF \
      -DENABLE_INSTALL=ON \
      -DENABLE_BSDTAR=OFF \
      -DENABLE_BSDCPIO=OFF \
      -DENABLE_BSDCAT=OFF \
      -DENABLE_ACL=OFF \
      -DENABLE_ICONV=OFF \
      -DENABLE_LIBXML2=OFF \
      -DENABLE_EXPAT=OFF \
      -DENABLE_OPENSSL=OFF \
      -DENABLE_TAR=OFF \
      -DENABLE_CPIO=OFF \
	  -DENABLE_WINCNG=OFF \
	  -DENABLE_RANDOM=OFF \
	  -DENABLE_CAT=OFF \
      -DENABLE_LZO=OFF \
      -DENABLE_LZMA=OFF \
      -DENABLE_BZIP2=OFF \
      -DENABLE_LIBB2=OFF \
      -DENABLE_LZ4=OFF \
	  -DENABLE_NETTLE=OFF \
	  -DENABLE_GNUTLS=OFF \
      -DENABLE_ZSTD=ON \
	  -DENABLE_PCREPOSIX=OFF \
	  -DCMAKE_DISABLE_FIND_PACKAGE_PkgConfig=ON \
	  -DENABLE_WERROR=OFF \
      -DENABLE_CAT=OFF`;

	const LIBARCHIVE_LINUX_FLAGS = `\
	  	-DLIBMD_FOUND=FALSE \
		-DHAVE__FSEEKI64=FALSE \
		-DHAVE__GET_TIMEZONE=FALSE \
		-DHAVE_CYGWIN_CONV_PATH=FALSE \
		-DARCHIVE_CRYPTO_MD5_LIBMD=FALSE \
		-DENABLE_BSDUNZIP=OFF \
		-DENABLE_UNZIP=OFF \
		-DARCHIVE_CRYPTO_SHA1_LIBMD=FALSE \
		-DARCHIVE_CRYPTO_SHA256_LIBMD=FALSE \
		-DARCHIVE_CRYPTO_SHA512_LIBMD=FALSE \
		-DARCHIVE_CRYPTO_RMD160_LIBMD=FALSE \
		-DENABLE_MD5=OFF \
		-DENABLE_LIBMD=OFF`;

	return {
		type: "architectures",
		windows_x86_64: {
			configStep: `cmake -S . -B dist/windows/x86_64 -G Ninja \
			-DCMAKE_TOOLCHAIN_FILE=${CMAKE_TOOLS}/windows_x86-64.cmake \
			-DCMAKE_SYSROOT=${windows_x86_64} \
      		-DCMAKE_BUILD_TYPE=Release \
      		-DBUILD_SHARED_LIBS=OFF \
      		${LIBARCHIVE_COMMON_FLAGS} \
      		-DCMAKE_C_COMPILER=${CLANG} \
      		-DCMAKE_CXX_COMPILER=${CLANGXX} \
      		-DCMAKE_C_COMPILER_TARGET=x86_64-w64-windows-gnu \
      		-DCMAKE_CXX_COMPILER_TARGET=x86_64-w64-windows-gnu \
			-DCMAKE_INCLUDE_PATH=${windows_x86_64}/include \
			-DZSTD_INCLUDE_DIR=D:/ProgramFiles/zstd-v1.5.7-win64/include \
			-DZSTD_LIBRARY=D:/ProgramFiles/zstd-v1.5.7-win64/lib/libzstd.a \
      		-DCMAKE_PREFIX_PATH=${CPP_OUTPUT_DIR}/libarchive/windows/x86_64 \
      		-DCMAKE_INSTALL_PREFIX=${CPP_OUTPUT_DIR}/libarchive/windows/x86_64
      		`,
			buildStep: `cmake --build dist/windows/x86_64 -j`,
			installStep: `cmake --install dist/windows/x86_64`,
		},
		windows_aarch64: {
			configStep: `cmake -S . -B dist/windows/aarch64 -G Ninja \
		  	-DCMAKE_BUILD_TYPE=Release \
		  	-DBUILD_SHARED_LIBS=OFF \
		  	${LIBARCHIVE_COMMON_FLAGS} \
		  	-DCMAKE_C_COMPILER=${CLANG} \
		  	-DCMAKE_CXX_COMPILER=${CLANGXX} \
		  	-DCMAKE_RC_FLAGS=--target=aarch64-w64-mingw32 \
		  	-DCMAKE_C_COMPILER_TARGET=aarch64-w64-windows-gnu \
		  	-DCMAKE_CXX_COMPILER_TARGET=aarch64-w64-windows-gnu \
			-DCMAKE_INCLUDE_PATH=${windows_aarch64}/include \
			-DZSTD_INCLUDE_DIR=D:/ProgramFiles/zstd-v1.5.7-win64/include \
			-DZSTD_LIBRARY=${ZSTD_LIB}/lib/windows/aarch64/libzstd.a \
		  	-DCMAKE_PREFIX_PATH=${CPP_OUTPUT_DIR}/libarchive/windows/aarch64 \
		  	-DCMAKE_INSTALL_PREFIX=${CPP_OUTPUT_DIR}/libarchive/windows/aarch64
		  	`,
			buildStep: `cmake --build dist/windows/aarch64 -j`,
			installStep: `cmake --install dist/windows/aarch64`,
		},
		linux_x86_64: {
			configStep: `cmake -S . -B dist/linux/x86_64 -G Ninja \
		  	-DCMAKE_TOOLCHAIN_FILE=${CMAKE_TOOLS}/linux_x86-64.cmake \
		  	-DCMAKE_BUILD_TYPE=Release \
		  	-DBUILD_SHARED_LIBS=OFF \
		  	${LIBARCHIVE_COMMON_FLAGS} \
			${LIBARCHIVE_LINUX_FLAGS} \
		  	-DCMAKE_C_COMPILER=${CLANG} \
		  	-DCMAKE_CXX_COMPILER=${CLANGXX} \
		  	-DCMAKE_C_COMPILER_TARGET=x86_64-unknown-linux-gnu \
		  	-DCMAKE_CXX_COMPILER_TARGET=x86_64-unknown-linux-gnu \
			-DZSTD_INCLUDE_DIR=${ZSTD_LIB}/include \
			-DZSTD_LIBRARY=${ZSTD_LIB}/lib/linux/x86_64/libzstd.a \
		  	-DCMAKE_PREFIX_PATH=${CPP_OUTPUT_DIR}/libarchive/linux/x86_64 \
		  	-DCMAKE_INSTALL_PREFIX=${CPP_OUTPUT_DIR}/libarchive/linux/x86_64
		  	`,
			buildStep: `cmake --build dist/linux/x86_64 -j`,
			installStep: `cmake --install dist/linux/x86_64`,
		},
		linux_aarch64: {
			configStep: `cmake -S . -B dist/linux/aarch64 -G Ninja \
		  	-DCMAKE_TOOLCHAIN_FILE=${CMAKE_TOOLS}/linux_aarch64.cmake \
		  	-DCMAKE_BUILD_TYPE=Release \
		  	-DBUILD_SHARED_LIBS=OFF \
		  	${LIBARCHIVE_COMMON_FLAGS} \
			${LIBARCHIVE_LINUX_FLAGS} \
		  	-DCMAKE_C_COMPILER=${CLANG} \
		  	-DCMAKE_CXX_COMPILER=${CLANGXX} \
		  	-DCMAKE_C_COMPILER_TARGET=aarch64-unknown-linux-gnu \
		  	-DCMAKE_CXX_COMPILER_TARGET=aarch64-unknown-linux-gnu \
			-DZSTD_INCLUDE_DIR=${ZSTD_LIB}/include \
			-DZSTD_LIBRARY=${ZSTD_LIB}/lib/linux/aarch64/libzstd.a \
		  	-DCMAKE_PREFIX_PATH=${CPP_OUTPUT_DIR}/libarchive/linux/aarch64 \
		  	-DCMAKE_INSTALL_PREFIX=${CPP_OUTPUT_DIR}/libarchive/linux/aarch64
		  	`,
			buildStep: `cmake --build dist/linux/aarch64 -j`,
			installStep: `cmake --install dist/linux/aarch64`,
		},
	} satisfies BuildType;
};

const args = argv.slice(2);
const [action = "help"] = args;

await runPackageAction(action, process.cwd(), build());
