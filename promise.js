const callApi = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Timeout done!');

      resolve(1);
    }, 1000);
  });
};

async function main() {
  console.log(await callApi());
}

main();
