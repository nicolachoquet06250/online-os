'use strict';

window.onload = () => {
    let change_list_grid = document.querySelector('change-list-grid');
    if(change_list_grid !== null) {
        change_list_grid.addEventListener('click', () => {
            if (change_list_grid.classList.contains('fa-th-list')) {
                change_list_grid.classList.remove('fa-th-list');
                change_list_grid.classList.add('fa-th');
            }
            else {
                change_list_grid.classList.remove('fa-th');
                change_list_grid.classList.add('fa-th-list');
            }
        });
    }

    function init_filer_ihm() {
        document.querySelector('.filer-menu').style.height = window.innerHeight + 'px';
        document.querySelector('.filer-body').style.height = window.innerHeight + 'px';
    }

    init_filer_ihm();

    window.addEventListener('resize', init_filer_ihm);
};