### Working version of STorybook under Bazel

```bash
	bazel run //apps/my-app:storybook_dev
```

Apparently the issue is with webpack alias and resolvers.