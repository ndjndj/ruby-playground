// メニュー操作

// トグルリスナーを追加する
function addToggleListener(selectedId, menuId, toggleClass) {
    const selectedElem = document.querySelector(`#${selectedId}`);
    selectedElem.addEventListener(
        "click",
        function(event) {
            event.preventDefault();
            const menu = document.querySelector(`#${menuId}`);
            menu.classList.toggle(toggleClass);
        }
    )
}

// トグルリスナーを追加して Click event を listen する
document.addEventListener(
    "turbo:load",
    function() {
        addToggleListener("hamburger", "navbar-menu"  , "collapse");
        addToggleListener("account"  , "dropdown-menu", "active");
    }
)