

export default function validAll(values) {

    let errors = {
        valid : true
    }

    if (values.category == "") {
        errors.message = "ارجوك قم بادخال الفئة"
        errors.valid = false
    }

    if (values.cover == "") {
        errors.message = "ارجوك قم برفع الملصق "
        errors.valid = false
    }

    if (values.bookfile == "") {
        errors.message = "ارجوك قم برفع الملف"
        errors.valid = false
    }

    if (values.description == "") {
        errors.message = "ارجوك قم بادخال الوصف"
        errors.valid = false
    }

    if (values.title == "") {
        errors.message = "ارجوك قم بادخال العنوان"
        errors.valid = false
    }
    

    return errors
}

export function validNew(values) {

    let errors = {
        valid : true
    }

    if (values.category == "") {
        errors.message = "ارجوك قم بادخال الفئة"
        errors.valid = false
    }

    if (values.cover == "") {
        errors.message = "ارجوك قم برفع الملصق "
        errors.valid = false
    }

    if (values.description == "") {
        errors.message = "ارجوك قم بادخال الوصف"
        errors.valid = false
    }

    return errors
}


export function validVideo(values) {
    const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/;
    let errors = {
        valid : true
    }

    if (values.videoID == "") {
        errors.message = "ارجوك قم بادخال الرابط"
        errors.valid = false
    }
    else if(!values.videoID.match(regex)) {
        errors.message = " ارجوك قم بادخال رابط صالح"
        errors.valid = false
    }

    if (values.title == "") {
        errors.message = "ارجوك قم بادخال العنوان"
        errors.valid = false
    }

    return errors
}


export function validEvent(values) {
    let errors = {
        valid : true
    }

    if (values.date == "") {
        errors.message = "ارجوك قم بادخال التاريخ"
        errors.valid = false
    }

    if (values.description == "") {
        errors.message = "ارجوك قم بادخال وصف الحدث"
        errors.valid = false
    }

    if (values.title == "") {
        errors.message = "ارجوك قم بادخال العنوان"
        errors.valid = false
    }

    return errors
}


export function validPhoto(values) {
    let errors = {
        valid : true
    }

    if (values.image == "") {
        errors.message = "ارجوك قم بادخال الصورة"
        errors.valid = false
    }

    return errors
}