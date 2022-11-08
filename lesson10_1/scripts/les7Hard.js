const DomElement = function(slt, ht, wt, backgr, fS) {
    this.selector = slt.trim();
    this.height = ht;
    this.width = wt;
    this.bg = backgr;
    this.fontSize = fS;
};

DomElement.prototype.createElement = function() {
    if (this.selector[0] === '.') {
        let div = document.createElement('div');
        div.classList.add(this.selector);
        div.style.cssText=
        `
            font-size: ${this.fontSize}px;
            background-color: ${this.bg};
            width: ${this.width}px;
            height: ${this.height}px;
        `;
        div.innerHTML = 'Параметр div';
        document.body.append(div);
    } else if (this.selector[0] === '#') {
        let p = document.createElement('p');
        p.style.cssText=
        `
            font-size: ${this.fontSize}px;
            background-color: ${this.bg};
            width: ${this.width}px;
            height: ${this.height}px;
        `;
        p.innerHTML = 'Параметр p';
        document.body.append(p);
    }
};

const div = new DomElement('.div', 50, 50, 'red', 16);
const p = new DomElement('#div', 80, 90, 'blue', 12);
div.createElement();
p.createElement();







