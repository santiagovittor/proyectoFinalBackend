const fs = require('fs');


class FsManager {

    constructor(ruta) {
        this.ruta = ruta;
    }


    getAll = async () => {

        if (fs.existsSync(this.ruta)) {
            try {
                let data = await fs.promises.readFile(this.ruta, 'utf-8');
                let result = JSON.parse(data)
                return { status: 'Success', payload: result }
            }
            catch (error) {
                return { status: 'Error', error: error }
            }
        }

    }



    getById = async (id) => {
        if (fs.existsSync(this.ruta)) {
            let data = await fs.promises.readFile(this.ruta, 'utf-8')
            let result = JSON.parse(data)
            let resultById = result.find(p => p.id === id)
            if (resultById) return { status: "success", product: resultById }
            else return { status: "error", message: "File not found." }
        }

    }


    deleteById = async (id, isAdmin, path, method) => {

        if (isAdmin) {
            try {
                if (!id) return { status: "error", message: "ID needed" }
                if (fs.existsSync(this.ruta)) {
                    let data = await fs.promises.readFile(this.ruta, 'utf-8')
                    let results = JSON.parse(data)
                    let newResults = results.filter(element => element.id !== id)
                    if (newResults.length === results.length) {
                        return { status: 'error', message: "Can't find the element ID." }
                    }
                    await fs.promises.writeFile(this.ruta, JSON.stringify(newResults, null, 2))
                    return { status: 'success', message: "Item deleted." }
                }

            } catch (error) {
                return { status: 'error', message: error }
            }
        }
        return { error: -1, descripcion: `Ruta ${path} método ${method} no autorizada con sus credenciales. ` }


    }


    deleteAll = async () => {
        if (fs.existsSync(this.ruta)) {
            let newResults = [];
            await fs.promises.writeFile(this.ruta, JSON.stringify(newResults))
            return { status: "success", payload: "All items deleted succesfully." }
        }

    }


}

module.exports = FsManager;