function emailValidator() {
    return function email(value) {
        return (value && !!value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) || 'Adicione um e-mail válido'
    }
}

function requiredValidator() {
    return function required(value) {
        return (value !== undefined && value !== null && value !== '') || 'Esse campo é necessário'
    }
}

export {
    emailValidator,
    requiredValidator
}
