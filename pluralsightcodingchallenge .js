const packages = [
 "KittenService: ",
 "Leetmeme: Cyberportal",
 "Cyberportal: Ice",
 "CamelCaser: KittenService",
 "Fraudstream: Leetmeme",
 "Ice: "
];

const compose = (...args) => args.reduce((f,g) => (...args) => f(g(...args)));

const getPackagesArray = packages => {
  return packages.reduce((acc, pack) => {
    const [packageName, dependency] = pack.split(': ');
    
    if (!packageName) throw 'Package name should be valid';
    
    if (dependency) {
      acc[packageName] = [...[dependency.split(',')]];
    } else {
      acc[packageName] = [];
    }
    return acc
  }, {});
};

const getSortedPackages = packagesArray => {
  const results = [];
  const sorted = {};
  const sort = (pack, ancesters = [])  => {
    if (sorted[pack]) return;
    ancesters.push(pack);
    
    const dependencies = packagesArray[pack];
    dependencies.forEach(dependency => sort(dependency, ancesters));
    
    sorted[pack] = true;
    results.push(pack);
  }
  
  Object.keys(packagesArray).forEach(pack => sort(pack));
  return results;
}

const arrayToString = joinBy => array => array.join(joinBy)
 
/*
 * Package Installer
 */
const packageInstaller = compose(
  arrayToString(', '), 
  getSortedPackages, 
  getPackagesArray
);

console.log(packageInstaller(packages));

