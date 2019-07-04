/* tslint:disable:no-unused-expression */

import { Connector } from '../../src/ts/model/connector';
import { WorkflowItem } from '../../src/ts/model/workflowItem';

import { expect } from 'chai';

describe('Connector', () => {
    it('should generate id automatically', () => {
        const connector = new Connector(new WorkflowItem(), new WorkflowItem());

        expect(connector.id).to.exist;
    });

    it('should have source and target items', () => {
        const source = new WorkflowItem();
        const target = new WorkflowItem();
        const connector = new Connector(source, target);

        expect(connector.source).to.equal(source);
        expect(connector.target).to.equal(target);
    });
});
