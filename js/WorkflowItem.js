/**
 * Created by Rajitha on 11/8/2014.
 */

function WorkflowItem(id, name, description, sequence, level) {
    //var _id = id,
    //    _name = name,
    //    _description = description,
    //    _sequence = sequence,
    //    _level = level;
    //
    //this.getId = function() { return _id; }
    //this.setId = function(value) { _id = value; }
    //
    //this.getName = function() { return _name; }
    //this.setName = function(value) { _name = value; }
    //
    //this.getDescription = function() { return _description; }
    //this.setDescription = function(value) { _description = value; }
    //
    //this.getSequence = function() { return _sequence; }
    //this.setSequence = function(value) { _sequence = value; }
    //
    //this.getLevel = function() { return _level; }
    //this.setLevel = function(value) { _level = value; }

    return {
        id: id,
        name: name,
        description: description,
        sequence: sequence,
        level: level
    }
}