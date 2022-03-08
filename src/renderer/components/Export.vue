<template>
  <button @click="writeCSV" class="btn btn-outline-secondary">Export</button>
</template>

<script>
import path from "path";
import fs from "fs";
import { toCsv } from "@iwsio/json-csv-node";

export default {
  props: ["json", "schema"],
  methods: {
    async writeCSV() {
      const options = {
        fields: this.schema.fields.map((field) => ({
          name: field.name,
          label: field.name,
        })),
        fieldSeparator: ",",
        ignoreHeader: false,
        encoding: "utf8",
      };

      try {
        let result = await toCsv(this.json, options);
        const dir = path.join(this.$userData, "export");
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);

        const file = path.join(dir, this.schema.name + ".csv");
        fs.writeFileSync(file, result);

        this.$notify({
          title: "File has been exported",
          type: "Success",
          text: `File can be found at ${file}`,
          duration: 10000,
        });
      } catch (err) {
        console.log(err);
        this.$notify({
          title: "Error occured",
          type: "error",
        });
      }
    },
  },
};
</script>
