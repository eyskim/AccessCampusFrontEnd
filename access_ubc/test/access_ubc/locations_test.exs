defmodule AccessUbc.LocationsTest do
  use AccessUbc.DataCase

  alias AccessUbc.Locations

  describe "buildings" do
    alias AccessUbc.Locations.Building

    @valid_attrs %{entrances: [], name: "some name"}
    @update_attrs %{entrances: [], name: "some updated name"}
    @invalid_attrs %{entrances: nil, name: nil}

    def building_fixture(attrs \\ %{}) do
      {:ok, building} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Locations.create_building()

      building
    end

    test "list_buildings/0 returns all buildings" do
      building = building_fixture()
      assert Locations.list_buildings() == [building]
    end

    test "get_building!/1 returns the building with given id" do
      building = building_fixture()
      assert Locations.get_building!(building.id) == building
    end

    test "create_building/1 with valid data creates a building" do
      assert {:ok, %Building{} = building} = Locations.create_building(@valid_attrs)
      assert building.entrances == []
      assert building.name == "some name"
    end

    test "create_building/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Locations.create_building(@invalid_attrs)
    end

    test "update_building/2 with valid data updates the building" do
      building = building_fixture()
      assert {:ok, %Building{} = building} = Locations.update_building(building, @update_attrs)
      assert building.entrances == []
      assert building.name == "some updated name"
    end

    test "update_building/2 with invalid data returns error changeset" do
      building = building_fixture()
      assert {:error, %Ecto.Changeset{}} = Locations.update_building(building, @invalid_attrs)
      assert building == Locations.get_building!(building.id)
    end

    test "delete_building/1 deletes the building" do
      building = building_fixture()
      assert {:ok, %Building{}} = Locations.delete_building(building)
      assert_raise Ecto.NoResultsError, fn -> Locations.get_building!(building.id) end
    end

    test "change_building/1 returns a building changeset" do
      building = building_fixture()
      assert %Ecto.Changeset{} = Locations.change_building(building)
    end
  end
end
