const baseUrl = 'https://jsonplaceholder.typicode.com/';
const PATH_POSTS = 'posts';
const PATH_USERS = 'Users';
const PATH_COMMENTS = 'Comments';

const endpoint = (path, param) => {
    var fullPath = path
    if (param) {
        let paramEncoded;
        for (key in param) {
            let value = param[key];
            if (value && value.length > 0) {
                if (paramEncoded) {
                    paramEncoded += `&${key}=${value}`;
                } else {
                    paramEncoded = `${key}=${value}`;
                }
            }

        }
        fullPath += `?${paramEncoded}`;
    }
    return `${baseUrl}${fullPath}`;
}

const ENDPOINT_USERS = endpoint(PATH_USERS)
const ENDPOINT_POSTS_OF_USER = (userId) => endpoint(PATH_POSTS, { userId: userId })
const ENDPOINT_COMMENTS_OF_POST = (postId) => endpoint(PATH_COMMENTS, { postId: postId })