const replace = (string) => {
    const replaced = string
        .replace('ö', 'o')
        .replace('ä', 'a')
        .replace('å', 'a')

    return replaced
}

export default replace
