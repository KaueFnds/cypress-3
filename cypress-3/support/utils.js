export const format = (value) => {
    let formattedValue

    formattedValue = value.replace(",", ".")
    formattedValue = Number(formattedValue.split("$")[1].trim())

    formattedValue = String(value).includes("-") ? -formattedValue : formattedValue

    return formattedValue
}

export const randonNumber = () => {
    return Math.floor(Math.random() * 101)
}


export const prepareLocalStorage = (win) => {

    win.localStorage.setItem('dev.finances:transactions', JSON.stringify([
        {
            empresa: "familia",
            description: "mesada",
            amount: (randonNumber() * 100),
            date: "30/04/2023"
        },
        {
            empresa: "padaria dois irmão",
            description: "coca cola + salgado",
            amount: ( - randonNumber() * 100),
            date: "30/04/2023"
        }
    ])
    )

}