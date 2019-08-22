const { expect       } = require('chai');
const { Item_Manager } = require('../../items/item_manager');
const { items } = require('../../items/data/item_data');

describe('items/item_manager', function() {
  describe('get_random_items()', function() {
    it('returns between 1 - 10 random items', function() {
      const items = Item_Manager.get_random_items({ min: 1, max: 10 });
      expect(items.length).to.be.closeTo(5, 5);
    });

    it('returns 1 random item', function() {
      const items = Item_Manager.get_random_items({ min: 1, max: 1 });
      expect(items.length).to.equal(1);
    });

    it('returns between 1 - 2 by default', function() {
      const items = Item_Manager.get_random_items();
      expect(items.length).to.be.closeTo(1.5, 0.5);
    });
  });

  describe('get_random_item()', function() {
    it('returns between 1random item', function() {
      const items = Item_Manager.get_random_item();
      expect(items).to.be.an('object');
    });
  });

  describe('get_item()', function() {
    // move to UUID
    it('throws if there is a dup item id', function() {
      const all_items = Item_Manager.get_all_items();
      const just_item_ids = all_items.map(item => item.id);

      const duplicates = just_item_ids.some((item, id) => {
        if(just_item_ids.indexOf(item.id) === id) {
          console.log('this item has a dup id: ' + all_items[id]);
          return true;
        }

        return false;
      });

      expect(duplicates).to.be.false;
    });

    it('throws if no item found with name', function() {
      expect(() =>
        Item_Manager.get_item('no item will exist with this name')
      ).to.throw();
    });

    it('returns an object with the specified condition', function() {
      const condition_of_item = 0.3;

      const item = Item_Manager.get_item('rusty_knife', {
        condition: condition_of_item,
      });

      expect(item.condition).to.equal(condition_of_item);
    });

    context('when checking each item', function() {
      it('returns an item if the name exists', function() {
        items.forEach(item => {
          const found_item = Item_Manager.get_item(item.name);

          expect(found_item.name).to.equal(item.name);
        });
      });

      it('returns an item with default properties', function() {
        items.forEach(item => {
          const found_item = Item_Manager.get_item(item.name);

          expect(found_item).to.have.property('name');
          expect(found_item).to.have.property('id');
          expect(found_item).to.have.property('cost');
          expect(found_item).to.have.property('category');
          expect(found_item).to.have.property('image_name');
          expect(found_item).to.have.property('description');
          expect(found_item).to.have.property('visual_name');
        });
      });
    });

    it('returns an item defined condition', function() {
      const condition = 0.3;

      const found_item = Item_Manager.get_item('rusty_knife', { condition });

      expect(found_item.condition).to.equal(condition);
    });

    it('returns an item if the name exists', function() {
      items.forEach(item => {
        const found_item = Item_Manager.get_item(item.name);
        expect(found_item.name).to.equal(item.name);
      });
    });
  });
});

