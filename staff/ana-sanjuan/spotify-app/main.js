let query;

const $artists = $('.artists')
$artists.hide()

const $albums = $('.albums')
$albums.hide()

const $tracks = $('.tracks')
$tracks.hide()

const $oneTrack = $('.one-track')
$oneTrack.hide()

const $form = $('form')
$form.submit(event => {
    event.preventDefault()

    const $input = $form.find('input')

    query = $input.val()

    logic.searchArtists(query)
        .then((res) => {
            var artists = res.artists.items
            view.listArtist(artists)
        })
        .catch(console.error)
})

