load("@npm//:defs.bzl", "npm_link_all_packages")
load("@aspect_bazel_lib//lib:copy_to_bin.bzl", "copy_to_bin")

exports_files(["package.json"])

copy_to_bin(
    name = "package_json",
    srcs = ["package.json"],
    visibility = ["//visibility:public"],
)

npm_link_all_packages(name = "node_modules")