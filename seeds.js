var mongoose    = require('mongoose'),
    Campground  = require('./models/campground'),
    Comment     = require('./models/comment');
    
var data = [
    { 
        name: "Cloud's Rest",
        image:"https://images.unsplash.com/photo-1527786356703-4b100091cd2c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=601fcba3c5d7ddec0c8f2690e8638461&auto=format&fit=crop&w=800&q=60",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
    },
    { 
        name: "Jesus Palace",
        image:"https://images.unsplash.com/photo-1526064965790-830f5207ab7e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f1ac21abf5aec26a012bb7c25a754796&auto=format&fit=crop&w=800&q=60",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
    },
    { 
        name: "Where is it?",
        image:"https://images.unsplash.com/photo-1523642595781-e7ce9855e4f6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4eecbe6d90b37b73251d508a97667fe5&auto=format&fit=crop&w=800&q=60",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
    }
];

function seedDB(){
    // Remove all campgrounds    
   Campground.remove({}, function(err){
        if (err) console.log(err);
        else {
            console.log("removed campgrounds");
              // add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if (err) console.log(err);
                    else {
                        console.log("added campgrounds");
                        // create a comment
                        Comment.create({
                            text: "This place ia great, but I wish there was Internet", 
                            author: "Homer"
                        }, function(err, comment){
                            if (err) console.log(err);
                            else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("created a new comment");
                            }
                        });
                    }
                });
            })
        }
    });
}

module.exports = seedDB; 

