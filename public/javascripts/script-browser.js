window.onload = () => {
    function init_browser_ihm() {
        // document.querySelector('#navigator-context').height = window.innerHeight + 'px';
    }

    function init_browser_actions() {
        let search_form = document.querySelector('#search');
        search_form.addEventListener('submit', e => {
            e.preventDefault();
            $.ajax({
                url: search_form.getAttribute('action'),
                type: search_form.getAttribute('method'),
                data: {
                    q: document.querySelector('#search_input').value
                }
            }).done(data => {
                document.querySelector('#browser-body').innerHTML = data;
            });
        });
    }

    init_browser_actions();

    init_browser_ihm();
    window.addEventListener('resize', init_browser_ihm);
};