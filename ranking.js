var ranking = (function(){

    var _table;

    function _htmlFactory(tagName, props) {
        var tag = document.createElement(tagName);
        if(Object.hasOwnProperty.call(props, 'class')) {
            tag.className = props['class'];
        }

        return tag;
    }

    function updateSorter(event) {
        var sortBy = event.target.value;
        _removeTable();
        _generateHtml(sortBy);
    }

    function getSortedData(key) {
        var data, scores = JSON.parse(localStorage.getItem('simon-score'));

        if(key === 'date') {
            data = scores.sort(function(current, next) {
                return  new Date(next.date) - new Date(current.date);
            })
        } else {
           data = scores.sort(function(current, next) {
                return  next.points - current.points;
            })
        }

        return data;
    }

    function _generateHtml(key) {
        var scores = getSortedData(key);

        document.querySelectorAll('.sort-button input').forEach(function(radioButton){
            radioButton.addEventListener('change', updateSorter)
        });

        if(scores) {
            _table = _getTable();
            var tbody = _htmlFactory('tbody', {}); 
            var scoreIterator = new Iterator(scores);
            var scoreRows = scoreIterator.next();

            while (!scoreRows.done) {
                var row = _createRow(scoreRows.value);
                tbody.appendChild(row);
                scoreRows = scoreIterator.next();
            }

            _table.appendChild(tbody);
            document.querySelector('.ranking').appendChild(_table);
        } 
    }

    function _removeTable() {
        _table.remove()
    }

    function _createRow(row) {
        var tr = _htmlFactory('tr', {});
        for (var key in row) {
            if (Object.hasOwnProperty.call(row, key)) {
                var td = _htmlFactory('td', {});
                var textNode = row[key];
                td.textContent = key === 'date' ? new Date(textNode).toLocaleString() : textNode;
                tr.appendChild(td); 
            }
        }

        return tr;
    }

    function _getTable() {
        var table = _htmlFactory('table', {class: 'ranking-table'});
        var headers = ['Usuario', 'Puntos', 'Nivel', 'Fecha'];
        var thead = _htmlFactory('thead', {});
        var tr = _htmlFactory('tr', {});

        headers.forEach(function(header) {
            var th = _htmlFactory('th', {});
            th.textContent = header;
            tr.appendChild(th);
        });

        thead.appendChild(tr);
        table.appendChild(thead);
        return table;
    }

    return {
        generateHtml : _generateHtml,
        removeTable: _removeTable
    }
})()