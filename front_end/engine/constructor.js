'use strict';

function construct(BaseClass, ...Mixins) {
  function copy_properties(target, source) {

    const all_property_names = Object.getOwnPropertyNames(source).concat(Object.getOwnPropertySymbols(source));

    all_property_names.forEach((property_name) => {
      if (property_name.match(/^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/))
        return;
      Object.defineProperty(target, property_name, Object.getOwnPropertyDescriptor(source, property_name));
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

  Mixins.forEach(Mixin => {
    copy_properties(Base.prototype, Mixin.prototype);
  });

  return Base;
}

module.exports = {
  construct,
};
