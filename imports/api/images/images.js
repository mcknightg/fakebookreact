import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';

const Images = new FilesCollection({
    debug: true,
    collectionName: 'Images',
    allowClientCode: false,
    storagePath: () => {
        return `${Meteor.absolutePath}/uploads`;
    },
    onBeforeUpload: (file) => {
        if (file.size > 10485760) {
            return 'Please upload image, with size equal or less than 10MB.';
        }

        if (!/png|jpg|jpeg/i.test(file.extension)) {
            return `${file.extension}'s files are not allowed for upload.`;
        }

        return true;
    },
});

export default Images;

/* Images.allow({
    insert: () => true,
    update: () => true,
    remove: () => true,
});*/
