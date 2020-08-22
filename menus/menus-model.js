const db = require('../data/db-config');

module.exports = {
  findById,
  findByTruckId,
  addMenuItem,
  removeMenuItem
};

function findById(id) {
  return db('menus')
    .join('menus_menuItems', 'menus.id', '=', 'menus_menuItems.menuId')
    .join('menuItems', 'menus_menuItems.menuItemId', '=', 'menuItems.id')
    .where({ 'menus.id': id })
    .select(
      'menuItems.id',
      'menuItems.itemName',
      'menuItems.itemDescription',
      'menuItems.itemPrice'
    )
    .orderBy('menuItems.id');
}

function findByTruckId(truckId) {
  return db('menus')
    .join('menus_menuItems', 'menus.id', '=', 'menus_menuItems.menuId')
    .join('menuItems', 'menus_menuItems.menuItemId', '=', 'menuItems.id')
    .where({ 'menus.truckId': truckId })
    .select(
      'menuItems.id',
      'menuItems.itemName',
      'menuItems.itemDescription',
      'menuItems.itemPrice'
    )
    .orderBy('menuItems.id');
}

async function addMenuItem(menuId, menuItemId) {
  const menu = await findById(menuId);
  const found = menu.filter((menuItem) => menuItem.id === menuItemId);

  if (found.length > 0) {
    return menu;
  } else {
    return db('menus_menuItems')
      .insert({ menuId, menuItemId })
      .then((res) => {
        return findById(menuId);
      });
  }
}

async function removeMenuItem(menuId, menuItemId) {
  const menu = await findById(menuId);
  const found = menu.filter((menuItem) => menuItem.id === menuItemId);

  if (found.length > 0) {
    return db('menus_menuItems')
      .where({ menuId, menuItemId })
      .del()
      .then((res) => {
        return findById(menuId);
      });
  } else {
    return menu;
  }
}