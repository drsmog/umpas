const chai = require('chai');
const should = chai.should();

const rewire = require('rewire');

const ObjectId = require('mongodb').ObjectID;

describe('roleInteractor', function () {

  const interactor = rewire('../interactors/roleInteractor');

  const actionsIdPairLambda = action => [action.id, action];

  describe('#computeDifference()', function () {

    const computeDifference = interactor.__get__('computeDifference');

    it('should return difference', function () {
      const commonAction = {
        id: new ObjectId(),
        pattern: '/one'
      };

      const oldActions = [{
        id: new ObjectId(),
        pattern: '/two'
      }, {
        id: new ObjectId(),
        pattern: '/four/*'
      }, commonAction];

      const newActions = [
        commonAction,
        {
          id: new ObjectId(),
          pattern: '/three'
        }
      ];

      const newActionsMap = new Map(newActions.map(actionsIdPairLambda));

      const difference = computeDifference(oldActions, newActionsMap);

      difference.should.have.length(2);

      difference.forEach(function (action) {
        action.pattern.should.be.oneOf(['/two', '/four/*']);
      });

    });

    it('should return entire actions list when second actions map is empty', function () {
      const actions = [{
        id: new ObjectId(),
        pattern: '/one/*'
      }];

      const secondActionsMap = new Map([]);

      const difference = computeDifference(actions, secondActionsMap);

      difference.should.have.length(1);
      difference[0].should.equal(actions[0]);

    });

    it('should return empty list same list and map records', function () {
      const actions = [{
        id: new ObjectId(),
        pattern: '/one/*'
      }, {
        id: new ObjectId(),
        pattern: '/two'
      }];

      const secondActionsMap = new Map(actions.map(actionsIdPairLambda));

      const difference = computeDifference(actions, secondActionsMap);

      difference.should.have.length(0);

    });

  });

  describe('#computeActionsToEdit()', function () {
    const computeActionsToEdit = interactor.__get__('computeActionsToEdit');

    it('should return updated actions from newActions', function () {
      const firstCommon = {
        id: new ObjectId(),
        pattern: '/one/one/*'
      };

      const secondCommon = {
        id: new ObjectId(),
        pattern: '/two/two/*'
      };

      const oldActions = [
        firstCommon,
        secondCommon,
        {
          id: new ObjectId(),
          pattern: '/patterrrn/*'
        }
      ];

      const newActions = [
        firstCommon,
        Object.assign({}, secondCommon, {pattern: '/twooo'}),
        {
          id: new ObjectId(),
          pattern: '/tesst'
        },
        {
          id: new ObjectId(),
          pattern: '/another/one'
        }
      ];

      const newActionsMap = new Map(newActions.map(actionsIdPairLambda));

      const actionsToEdit = computeActionsToEdit(oldActions, newActionsMap);

      actionsToEdit.should.have.length(1);

      actionsToEdit[0].id.should.equal(secondCommon.id);
      actionsToEdit[0].pattern.should.equal('/twooo');

    });

  });
});
