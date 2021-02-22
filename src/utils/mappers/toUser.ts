export function mapToUser(src , target:Function) {
    let trgt = target()
    const targetKeys = Object.keys(trgt);
    for (const key of targetKeys) {
        trgt[key] = src[key]
    }
    return trgt;
}