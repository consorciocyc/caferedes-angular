import { Injectable } from "@angular/core";
import $ from "jquery";
import "jquery-ui/ui/widgets/datepicker";
import "jquery-ui/ui/widgets/autocomplete";

@Injectable()
export class AutocompleteService {
  constructor() {}

  ngOnInit() {}

  // funcion autocomplete proveedor
  autocomplete_provider() {
    $(function() {
      $(".provider").click(function() {
        var oID = $(this).attr("id");

        $(this).autocomplete({
          source: "api/provider/autocomplete",
          minLength: 1,
          selectFirst: true,
          success: function() {},
          select: function(event, ui) {
            $("#" + oID + "hiden").val(ui.item.provee_id);
          }
        });
      });
    });
  }

  autocomplete_user(user) {
    $(document).on("keyup", ".user_name", function(event) {
      $(this).autocomplete({
        source: "api/employee/autocomplete_employee",
        minLength: 1,
        selectFirst: true,
        success: function() {},
        select: function(event, ui) {
          console.log(ui.item);
          user.Users_id_identification = ui.item.identification;
          user.name = ui.item.name;
          user.last_name = ui.item.last_name;
          user.idemployees = ui.item.idemployees;
        }
      });
    });
  }

  autocomplete_code_provider() {
    $(document).on("keyup", ".item_actividad .code_provider", function(event) {
      let idlist = localStorage.getItem("id_list");
      let provider = $("#providerhiden").val();

      $(this).autocomplete({
        source:
          "api/provider/autocomplete_code?idlist=" +
          idlist +
          "&provider=" +
          provider,
        minLength: 1,
        selectFirst: true,
        success: function() {},
        select: function(event, ui) {
          $(this)
            .parents(".item_actividad")
            .find(".description")
            .val(ui.item.description);
          $(this)
            .parents(".item_actividad")
            .find(".unit_value")
            .val(ui.item.supply_vlru);
          $(this)
            .parents(".item_actividad")
            .find(".discount")
            .val(ui.item.supply_discount);
          $(this)
            .parents(".item_actividad")
            .find(".iva")
            .val(ui.item.supply_iva);
          $(this)
            .parents(".item_actividad")
            .find(".codemate_provider")
            .val(ui.item.value);

            $(this)
            .parents(".item_actividad")
            .find(".idcode")
            .val(ui.item.idmateriales);
        }
      });
    });
  }

  autocomplete_description_provider() {
    $(document).on("keyup", ".item_actividad .description", function(event) {
      $(this).autocomplete({
        source: "api/provider/autocomplete_description_provider",
        minLength: 1,
        selectFirst: true,
        success: function() {},
        select: function(event, ui) {
          $(this)
            .parents(".item_actividad")
            .find(".code_provider")
            .val(ui.item.code);
          $(this)
            .parents(".item_actividad")
            .find(".unit_value")
            .val(ui.item.supply_vlru);
          $(this)
            .parents(".item_actividad")
            .find(".discount")
            .val(ui.item.supply_discount);
          $(this)
            .parents(".item_actividad")
            .find(".iva")
            .val(ui.item.supply_iva);
        }
      });
    });
  }

  autocomplete_material_code() {
    var company = localStorage.getItem("company");
    $(document).on("keyup", ".item_actividad .code_mater", function(event) {
      let cellar = $("#cellar").val();

      $(this).autocomplete({
        source:
          "api/material/query_inventmate_code?cellar=" +
          cellar +
          "&company=" +
          company,
        minLength: 1,
        selectFirst: true,
        success: function() {},
        select: function(event, ui) {
          $(this)
            .parents(".item_actividad")
            .find(".description")
            .val(ui.item.description);
          $(this)
            .parents(".item_actividad")
            .find(".unidad")
            .val(ui.item.name_Unity);
          $(this)
            .parents(".item_actividad")
            .find(".stock")
            .val(ui.item.quantity);
          $(this)
            .parents(".item_actividad")
            .find(".code")
            .val(ui.item.code);
        }
      });
    });
  }

  autocomplete_material_description() {
    let company = localStorage.getItem("company");

    $(document).on("keyup", ".item_actividad .code_description", function(
      event
    ) {
      let cellar = $("#cellar").val();

      $(this).autocomplete({
        source:
          "api/material/query_inventmate_descrip?cellar=" +
          cellar +
          "&company=" +
          company,
        minLength: 1,
        selectFirst: true,
        success: function() {},
        select: function(event, ui) {
          $(this)
            .parents(".item_actividad")
            .find(".code_mater")
            .val(ui.item.code);
          $(this)
            .parents(".item_actividad")
            .find(".unidad")
            .val(ui.item.name_Unity);
          $(this)
            .parents(".item_actividad")
            .find(".stock")
            .val(ui.item.quantity);
          $(this)
            .parents(".item_actividad")
            .find(".code")
            .val(ui.item.code);
        }
      });
    });
  }

  autocomplete_employee() {
    $(function() {
      $(".employee").click(function() {
        var oID = $(this).attr("id");

        $(this).autocomplete({
          source: "api/employee/autocomplete_employee",
          minLength: 1,
          selectFirst: true,
          success: function() {},
          select: function(event, ui) {
            $("#" + oID + "hiden").val(ui.item.idemployees);
          }
        });
      });
    });
  }
}
