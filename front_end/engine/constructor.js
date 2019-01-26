'use strict';

function construct(BaseClass, ...Mixins) {
  function copy_properties(target, source) {

    const all_property_names = Object.getOwnPropertyNames(source).concat(Object.getOwnPropertySymbols(source));

    all_property_names.forEach((propertyName) => {
      if (propertyName.match(/^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/))
        return;
      Object.defineProperty(target, propertyName, Object.getOwnPropertyDescriptor(source, propertyName));
    });
  }

  class Base extends BaseClass
  {
    constructor (...args) {
      super(...args);

      Mixins.forEach((Mixin) => {
        copy_properties(this, new Mixin(...args));
      });
    }
  }

  Mixins.forEach((Mixin) => {
    copy_properties(Base.prototype, Mixin.prototype);
  });

  return Base;
}

module.exports = {
  construct,
};
