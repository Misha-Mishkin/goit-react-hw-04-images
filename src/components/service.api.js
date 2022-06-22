export function fetchPicture(searchQuery, page = 1) {
    return fetch(
        `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=27053567-d7028909cdd90784b9b54ea6e&image_type=photo&orientation=horizontal&per_page=12`).then( response => response.json())
}