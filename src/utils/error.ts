export const getErrorMessage = (response: any) => {
    let error = "Ocorreu um problema no cadastro, contate o suporte para mais informações."

    if (typeof response.message === 'string') 
        error = response.message
    else if (response.message.message) 
        error = response.message.message

    return error
}