module.exports = {
  name: 'ngrx-beta-app',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/ngrx-beta-app',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
