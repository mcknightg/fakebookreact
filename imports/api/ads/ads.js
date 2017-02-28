import { Mongo } from 'meteor/mongo';

const Ads = new Mongo.Collection('ads');

export default Ads;

Ads.allow({
    insert: () => true,
    update: () => true,
    remove: () => true,
});
