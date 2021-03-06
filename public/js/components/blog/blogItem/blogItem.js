/*
Create Angular component blogItem into module app.blog with databinding properties
- post : post data for all content
- editable : boolean indicate if this element is editable
*/
let blogItem = {
    bindings: {
        post: "<",
        editable: "<"
    },
    templateUrl: 'js/components/blog/blogItem/blogItem.html',
    controller: ['UsersService', 'PostsService', '$stateParams', '$state', function (UsersService, PostsService, $stateParams, $state) {
        'use  strict'
        let initialPost;

        // Call getCurrent() method from UsersService.
        // When this request receive response we affect response data to this controller variable user
        UsersService.getCurrent().then((user) => {
            this.user = user
        }).catch((err) => {
            console.log(err)
        })

        // Test if $stateParams.id exists (ex: stateParams.id is 1234567 form this url http://domain.ext/1234567)
        if ($stateParams.id) {
            // If $stateParams.id is _new (when you click on add on blogListMenu button see blogListMenu.html)
            if ($stateParams.id === '_new') {
                // Affect post variable with empty object
                this.post = {}
                this.post.isNew = true;
                // Affect editMode property to true
                this.editMode = true
            } else {
                // If $stateParams.id is an id we make HTTP request with this id to get data
                PostsService.getById($stateParams.id).then((res) => {
                    // when this request receives response we affect response data to this controller variable post
                    this.post = res.data;
                    // save into initialPost a copy of this post (used for undo)
                    initialPost = angular.copy(this.post)
                }).catch(function (post) {
                    if (!post.published) {
                        $state.go('blog.list')
                        Materialize.toast('Article not published yet', 4000);
                    }
                });
            }
        } else {
            //If $stateParams.id doesn't exist we change state to app.blog.list (redirection to list)
            $state.go('blog.list')
        }

        // Create delete function.
        // If you want to use in view you can call with $ctrl.delete()
        this.delete = () => {
            // Call delete method form PostsService with post
            PostsService.delete(this.post).then((res) => {
                // when this request receive response we change state to app.blog.list (redirection to list)
                $state.go('blog.list')
            })
        }

        // Create save function.
        // If you want to use in view you can call with $ctrl.save()
        this.save = () => {
            // Call save method form PostsService with post
            PostsService.save(this.post).then((res) => {
                // Change editMode value to false
                this.editMode = false
                if (!this.post._id) {
                    // if it's new post (when post._id doesn't exist) we affect to post variable response data (post created)
                    this.post = res.data
                }
            })
        }

        // Create undo function.
        // If you want to use in view you can call with $ctrl.undo()
        this.undo = () => {
            if (this.post && !this.post.isNew) {
                // Affect initialPost value to post and change editMode to false
                this.post = initialPost
                this.editMode = false
            } else {
                $state.go('blog.list')
            }
        }

        this.isFav = () => {
            if (this.post) 
            return (this.user.bookmarks.find((post) => post === this.post._id))
        }

        this.addOrRemoveToBookmark = () => {
            console.log(this.user.bookmarks);
            // Try to find post in bookmarks
            console.log(this.post);
            let postFound = this.user.bookmarks.find((post) => post === this.post._id)
            console.log(postFound);
            if (!postFound) {
                //Not found
                this.user.bookmarks.push(this.post._id)
            } else {
                //Found
               // this.user.bookmarks.slice(this.post._id)
                this.user.bookmarks = this.user.bookmarks.filter((post) => {
                    return post !== this.post._id
                })
            }

            UsersService.update(this.user).then((res) => {
                //return UsersService.setToken(res.data.token)
            }).then((user) => {
                Materialize.toast((postFound ? 'Removed' : 'Added'), 2000, (postFound ? 'toast-warning' : 'toast-success'))
            }).catch((err) => {
                let toastContent = `Error : ${err.data} !`
                Materialize.toast(toastContent, 4000, 'toast-error')
            })
        }

    }]
}

export default blogItem
