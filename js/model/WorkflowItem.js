/**
 * Created by Rajitha on 11/8/2014.
 */

function WorkflowItem(id, name, description, sequence, level) {
    return {
        id: id,
        name: name,
        description: description,
        sequence: sequence,
        level: level
    }
}

function IntermediateItem(level) {
    return new WorkflowItem(-1, "Intermediate", "Intermediate", -1, level);
}