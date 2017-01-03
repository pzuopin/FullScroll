function Fullscroll(option) {
    this.wrapper = document.querySelector(option.wrapper);
    this.container = document.querySelector(option.container);
    this.aLi = document.querySelectorAll(option.items);
    this.isFollow = option.isFollow || false;
    this.speed = option.speed || .5;
    this.top = 0;
    this.now = 0;
    this.downX;
    this.disX;
    this.init(this,option);
}
Fullscroll.prototype = {
    init: function(_this,option) {
        this.wrapper.style.height = '100vh';
        this.wrapper.style.overflow = 'hidden';
        for (var i = 0; i < this.aLi.length; i++) {
            this.aLi[i].style.height = '100vh';
            this.aLi[i].style.overflow = 'hidden';
        }
        document.documentElement.addEventListener('touchmove', function() {
            event.preventDefault();
        });
        this.wrapper.addEventListener("touchstart", function() {
            _this.mouseDown(_this);
        });
        if (this.isFollow) this.wrapper.addEventListener("touchmove", function() {
            _this.mouseMove(_this);
        });
        this.wrapper.addEventListener("touchend", function() {
            _this.mouseEnd(_this,option);
        });
    },
    mouseDown: function(_this) {
        _this.container.style.WebkitTransition = '';
        _this.downX = event.targetTouches[0].clientY;
        _this.disX = _this.downX - _this.top;

    },
    mouseMove: function(_this) {
        var moveX = event.targetTouches[0].clientY;
        _this.top = moveX - _this.disX;
        if (_this.top >= 0) {
            _this.top = 0;
        }
        if (_this.top <= -_this.container.offsetHeight + _this.aLi[0].offsetHeight) {
            _this.top = -_this.container.offsetHeight + _this.aLi[0].offsetHeight;
        }
        _this.container.style.transform = "translateY(" + _this.top + "px)";
    },
    mouseEnd: function(_this,option) {
        var upX = event.changedTouches[0].clientY;
        if (upX - _this.downX > _this.aLi[0].offsetHeight / 4) {
            _this.now--;
            if (_this.now <= 0) _this.now = 0;
        }
        if (upX - _this.downX < -_this.aLi[0].offsetHeight / 4) {
            _this.now++;
            if (_this.now == _this.aLi.length) _this.now = _this.aLi.length - 1;
        }
        _this.top = -_this.now * _this.aLi[0].offsetHeight;
        _this.container.style.WebkitTransition = 'transform ' + _this.speed + 's ease-out';
        _this.container.style.transform = "translateY(" + _this.top + "px)";
        _this.wrapper.removeEventListener('touchmove', function() {
            _this.mouseMove(_this);
        });
        _this.wrapper.removeEventListener('touchend', function() {
            _this.mouseEnd(_this);
        });
        option.fn && option.fn(_this.now);
    },
    constructor: Fullscroll
};