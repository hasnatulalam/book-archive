// document.getElementById('error-message').style.display = 'none';
const searchBook = () => {
    const searchInput = document.getElementById('searchInput')
    const searchText = searchInput.value
    // clear data
    searchInput.value = ''
    // console.log(search)


    if (searchText === '') {
        alert('search filed can not be empty')
    } else {
        totalSearchResult('hidden');
        // load data 
        const url = `https://openlibrary.org/search.json?q=${searchText}`
        // console.log(url)
        fetch(url)
            .then((res) => res.json())
            .then(data => displaySearchData(data.docs))
    }
}

const totalSearchResult = (style) => {
    document.getElementById('search-result').style.visibility = style;
    document.getElementById('total-result').style.visibility = style;
}

const displaySearchData = (docs) => {
    // console.log(doc)

    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    // total result found 
    const totalResult = document.getElementById('totalResult')
    totalResult.innerText = docs.length

    if (docs.length === 0) {
        // show no result found 
        // document.getElementById('error').innerText = `search field cannot be empty`
        alert('book is not found')
    }

    docs.slice(0, 20).forEach(doc => {
        // console.log(doc)
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = ` <div class="card h-100 shadow rounded-3">
                <img src="https://covers.openlibrary.org/b/id/${doc.cover_i ? doc.cover_i : -1}-M.jpg" class="card-img-top h-75" alt="not available">
                <div class="card-body">
                    <p class="card-title"> <strong>Book Name: </strong>  ${doc.title}</p>
                    <p class="card-text"> <strong>Author Name: </strong> ${doc.author_name ? doc.author_name : 'unknown'}</p>
                    <p class="card-text"> <strong>Publisher Name: </strong> ${doc.publisher[0] ? doc.publisher : 'unknown'}</p>
                    <p class="card-text"><strong>First Publisher Name: </strong>${doc.first_publish_year ? doc.first_publish_year : 'unknown'}</p>
                </div>
            </div>
            `;
        searchResult.appendChild(div)
    })
    totalSearchResult('visible');
}