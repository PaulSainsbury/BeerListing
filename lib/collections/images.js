var path = '';
if (Meteor.isServer) {
  path = process.env.PWD;
}
var imageStore = new FS.Store.FileSystem("images", {
  path: path + "/public/images", //optional, default is "/cfs/files" path within app container
  beforeWrite: function(fileObj) {
    // We return an object, which will change the
    // filename extension and type for this store only.
    return {
      extension: 'png',
      type: 'image/png'
    };
  },
  transformRead: function(fileObj, readStream, writeStream) {
    // Transform the image into a 10x10px PNG thumbnail
    gm(readStream).resize(100).stream('PNG').pipe(writeStream);
    // The new file size will be automatically detected and set for this store
  },
  maxTries: 1 //optional, default 5
});

console.log(imageStore.path);

Images = new FS.Collection("images", {
  stores: [imageStore],
  filter: {
    allow: {
      contentTypes: ['image/*'] //allow only images in this FS.Collection
    }
  }
});

Images.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  },
  download: function () {
    return true;
  }
});
