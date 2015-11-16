// if (Meteor.isServer) {
//   var imageStore = new FS.Store.S3('images', {
//     region: 'eu-central-1',
//     s3_signature_version: 'v4',
//     accessKeyId: process.env.AWS_ACCESS_KEYID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESSKEY,
//     bucket: process.env.AWS_BUCKET
//   });

//   Images = new FS.Collection("Images", {
//     stores: [imageStore],
//     filter: {
//       allow: {
//         contentType: ['image/*']
//       }
//     }
//   });
// }

// if (Meteor.isClient) {
//   var imageStore = new FS.Store.S3("images");
//   Images = new FS.Collection("Images", {
//     stores: [imageStore],
//     filter: {
//       allow: {
//         contentTypes: ['image/*']
//       },
//       onInvalid: function(message) {
//         FlashMessages.sendError(message);
//       }
//     }
//   });
// }

// // Allow rules
// Images.allow({
//   insert: function() { return true; },
//   update: function() { return true; },
//   remove: function() { return true; },
//   download: function() {return true; }
// });

// Images = new Mongo.Collection("images");