function translate(title) {
    let translated;
    const lang = localStorage.getItem('lang');

    if (lang === 'eng') translated = title.replace("Add", "Update");
    else translated = title.replace("Dodaj", "Azuriraj");

    return translated;
}

export default translate