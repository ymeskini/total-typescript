type MyReturnType<T extends (...args: any) => any> = ReturnType<T>
