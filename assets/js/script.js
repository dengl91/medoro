document.addEventListener('DOMContentLoaded', function () {

    let toggles = document.querySelectorAll("[data-toggle]");

    toggles.forEach( function(toggle, index, array) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
        });
    });

    let controls = document.querySelectorAll("[data-control]");

    controls.forEach( function(control, index, array) {
        control.addEventListener('click', (e) => {
            e.target.classList.toggle('active');
            let target = control.getAttribute('data-control');
            document.querySelector('.' + target).classList.toggle('active');
        });
    });

    var tab_items = document.querySelectorAll('.tab__item');
    
    tab_items.forEach(tab_item => {
        tab_item.addEventListener('click', (e) => {
            [...e.target.parentElement.children].forEach(sib => sib.classList.remove('active'));
            e.target.classList.add('active');
        });
    });

    if( window.screen.width <= 1280 ){
        const searchForm = document.querySelector('.search__form')

        searchForm.addEventListener('click', (e) => {
            if( !searchForm.classList.contains('active') ){
                let content_width = document.querySelector('.content').offsetWidth - 60;
                let notif_width = document.querySelector('.heading .notifications').offsetWidth + 20;
                let user_width = document.querySelector('.heading .user').offsetWidth;
                console.log(content_width);
                console.log(notif_width);
                console.log(user_width);
                searchForm.classList.toggle('active')
                searchForm.querySelector('input').style.width = content_width - notif_width - user_width + 'px';
            }
        })
    }

    var x, i, j, l, ll, selElmnt, a, b, c;
    /*look for any elements with the class "custom-select":*/
    x = document.getElementsByClassName("select__custom");
    l = x.length;
    for (i = 0; i < l; i++) {
        selElmnt = x[i].getElementsByTagName("select")[0];
        ll = selElmnt.length;
        /*for each element, create a new DIV that will act as the selected item:*/
        a = document.createElement("DIV");
        a.setAttribute("class", "select-selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        x[i].appendChild(a);
        /*for each element, create a new DIV that will contain the option list:*/
        b = document.createElement("DIV");
        b.setAttribute("class", "select-items select-hide");
        for (j = 1; j < ll; j++) {
            /*for each option in the original select element,
            create a new DIV that will act as an option item:*/
            c = document.createElement("DIV");
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.addEventListener("click", function (e) {
                /*when an item is clicked, update the original select box,
                and the selected item:*/
                var y, i, k, s, h, sl, yl;
                s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                sl = s.length;
                h = this.parentNode.previousSibling;
                for (i = 0; i < sl; i++) {
                    if (s.options[i].innerHTML == this.innerHTML) {
                        s.selectedIndex = i;
                        h.innerHTML = this.innerHTML;
                        y = this.parentNode.getElementsByClassName("same-as-selected");
                        yl = y.length;
                        for (k = 0; k < yl; k++) {
                            y[k].removeAttribute("class");
                        }
                        this.setAttribute("class", "same-as-selected");
                        break;
                    }
                }
                h.click();
            });
            b.appendChild(c);
        }
        x[i].appendChild(b);
        a.addEventListener("click", function (e) {
            /*when the select box is clicked, close any other select boxes,
            and open/close the current select box:*/
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
        });
    }
    function closeAllSelect(elmnt) {
        /*a function that will close all select boxes in the document,
        except the current select box:*/
        var x, y, i, xl, yl, arrNo = [];
        x = document.getElementsByClassName("select-items");
        y = document.getElementsByClassName("select-selected");
        xl = x.length;
        yl = y.length;
        for (i = 0; i < yl; i++) {
            if (elmnt == y[i]) {
                arrNo.push(i)
            } else {
                y[i].classList.remove("select-arrow-active");
            }
        }
        for (i = 0; i < xl; i++) {
            if (arrNo.indexOf(i)) {
                x[i].classList.add("select-hide");
            }
        }
    }
    /*if the user clicks anywhere outside the select box,
    then close all select boxes:*/
    document.addEventListener("click", closeAllSelect);

    let fileDroppers = document.querySelectorAll('.filedropper');

    fileDroppers.forEach(fileDropper => {
        fileDropper.onchange = function (e) {
            e.target.parentElement.querySelector('label').textContent = e.target.files[0].name;
        };
    });

    if( document.querySelector('.sidebar__col') ){
        document.addEventListener('click', (e) => {
            if ( e.target.closest('.sidebar__col') == null && e.target.closest('.filter__btn') == null ) {
                document.querySelector('.sidebar__col').classList.remove('active')
            }
        })
    }

});