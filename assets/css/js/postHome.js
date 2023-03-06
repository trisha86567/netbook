//form--> post save
//with use of ajax


let createPost = function(){
    let newPostform = $('#new-post-form')
    newPostform.submit(function(e){
        e.preventDefault()
        s.ajax({
            type:'post',
            url:'/post/create',
            data:newPostform.serialize(),
            success:function(data){
                console.log(data);
                let newPost = newPostDom(data.data.post)
                $('#posts-list-container').prepend(newPost);
                deletePost($('.delete-post-button',newPost))
            },
            error:function(error){
                console.log(error);
            },

        })
    })
     
    let newPostDom = function(post){
     $(`<li id="post-<%= post._id %>">
     <p>
         
         <small>
             <a class="delete-post-button"   href="/posts/destroy/${ post.id }">X</a>
         </small>
         
         ${ post.content}
         <br>
         <small>
             ${ post.user.name }
         </small><br>
     </p>
     <div class="post-comments">
         
             <form action="/comments/create" method="POST">
                 <input type="text" name="content" placeholder="Type Here to add comment..." required>
                 <input type="hidden" name="post" value="${ post._id }" >
                 <input type="submit" value="Add Comment">
             </form>
 
        
 
         <div class="post-comments-list">
             <ul id="post-comments-${ post._id }">
                 <% for (comment of post.comments){%>
                     <%- include('_comment'); %>
                     
                 <%} %>
             </ul>
         </div>
     </div>
     
 </li>`)


    }






}



let deletePost = function(deleteLink){
    $(deleteLink).click(function(e){
        e.preventDefault()
        s.ajax({
            type:'get',
            url:$(deleteLink).prop('href'),
            data:newPostform.serialize(),
            success:function(data){
                $(`#post-${data.data.post_id}`).remove()
            },
                
        
            error:function(error){
                console.log(error);
            },

        })
    })

}
